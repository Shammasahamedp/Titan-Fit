import React from "react";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Button } from "@/components/ui/button";
import { ITrainerEditProfile } from "@/interfaces/trainer-interfaces";
import { showErrorToast } from "@/utils/toast";
import { showSuccessToast } from "@/utils/toast";
import { useState, useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainerProfileEditSchema } from "@/schemas/trainer-profile-edit";
import {
  uploadTrainerCertificate,
  editTrainerProfile,
  getTrainerProfile,
} from "@/api/trainer-apicalls";
import { uploadFile } from "@/api/file-upload";
import { trainerErrors } from "@/messages/trainer-errors";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { ITrainerProfileContextType } from "@/interfaces/trainer-interfaces";
import { isDeepEqual } from "@/utils/is-equal";
const TrainerProfile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 3;
  const [certificates, setCertificates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [disable, setButtonDisable] = useState(false);
  const { trainerProfile, setTrainerProfile, setPasswordModal } =
    useOutletContext<ITrainerProfileContextType>();
  const certificatePdfInput = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITrainerEditProfile>({
    resolver: yupResolver(trainerProfileEditSchema),
  });

  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  const currentCertificates = certificates.slice(
    indexOfFirstCertificate,
    indexOfLastCertificate
  );

  const totalPages = Math.ceil(certificates.length / certificatesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleCertificateUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const fileList = event.target.files;
      const uploadFileResponse = await uploadFile(
        fileList as FileList,
        "trainer-certificate"
      );
      if (uploadFileResponse.data) {
        const response = await uploadTrainerCertificate(
          uploadFileResponse.data.url
        );

        showSuccessToast(response?.data.message);
        setCertificates(response?.data.trainerCertificate);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };
  const onSubmit = async (data: ITrainerEditProfile) => {
    try {
      if (trainerProfile) {
        const { profilePicture, trainerCertificate, ...rest } = trainerProfile;

        if (isDeepEqual(data, rest)) {
          showErrorToast(trainerErrors.PROFILE_CHANGE_NEED);
          return;
        }
        const responseData = await editTrainerProfile(data);
        if (responseData.success) {
          showSuccessToast(responseData.message);
          setTrainerProfile(responseData.returnedTrainerProfile);
        }
      }
    } catch (error) {
      showErrorToast(error);
    }
  };
  useEffect(() => {
    const fetchTrainerProfile = async () => {
      try {
        const trainerProfileDetails = await getTrainerProfile();
        if (trainerProfileDetails) {
          setTrainerProfile(trainerProfileDetails.trainerProfile);
          setCertificates(
            trainerProfileDetails.trainerProfile.trainerCertificate
          );
        }
      } catch (error) {
        showErrorToast(error);
      }
    };
    fetchTrainerProfile();
  }, []);

  useEffect(() => {
    if (trainerProfile && isEditing) {
      const { profilePicture, trainerCertificate, ...rest } = trainerProfile;
      reset(rest);
    }
  }, [isEditing, reset]);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8  ">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-warm-yellow">
          Profile Overview
        </h2>
        {!isEditing && (
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 bg-[#FFC436]  text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#FFC436]"
            >
              Edit Profile
            </button>
            <button
              disabled={disable}
              onClick={() => setPasswordModal(true)}
              className="mt-2 bg-[#FFC436]  text-black font-semibold px-3 py-1 rounded hover:bg-black hover:text-[#FFC436]"
            >
              {disable ? "Loading..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
      {isEditing && trainerProfile ? (
        <>
          <div className="bg-black/30 border border-white/10 rounded-xl p-6 shadow-lg  text-white">
            <p className="text-center text-sm text-black mt-4"></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Name"
                register={register("name")}
                error={errors.name?.message}
                type="text"
              />
              <InputField
                label="Email"
                register={register("email")}
                error={errors.email?.message}
                disabled={true}
              />

              <SelectField
                label="Gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                register={register("gender")}
              />
              <InputField
                label="Age"
                register={register("age")}
                error={errors.age?.message}
                type="number"
              />

              <InputField
                label="Phone"
                register={register("phone")}
                error={errors.phone?.message}
                type="text"
              />
              <InputField
                label="Bio"
                register={register("bio")}
                error={errors.bio?.message}
                type="text"
              />
              <InputField
                label="Years Of Experience"
                register={register("yearsOfExperience")}
                error={errors.yearsOfExperience?.message}
                type="text"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mt-4 bg-[#FFC436]  text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#FFC436] "
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className="mt-4 bg-[#FFC436]  text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#FFC436] "
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-black/30 border border-white/10 rounded-xl p-6 shadow-lg ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {[
              { label: "Name", value: trainerProfile?.name },
              { label: "Email", value: trainerProfile?.email },
              { label: "Phone", value: trainerProfile?.phone || "Not added" },
              { label: "Age", value: trainerProfile?.age },
              { label: "Gender", value: trainerProfile?.gender || "Not added" },
              {
                label: "Years Of Experience",
                value: trainerProfile?.yearsOfExperience || "Not added",
              },
              // { label: "Bio", value: trainerProfile?.bio || "Not added" },
            ].map((field, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <div className="text-warm-yellow text-sm font-medium mb-1">
                  {field.label}
                </div>
                <div className="text-white">{field.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
            <div className="p-4 bg-black/20 rounded-lg">
              <div className="text-warm-yellow text-sm font-medium mb-1">
                Bio
              </div>
              <div className="text-white">{trainerProfile?.bio}</div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full  bg-black/30 p-8">
        <h2 className="text-xl font-bold text-warm-yellow">Current status</h2>
        <div className="text-[#FFC436] text-sm font-medium mb-1">
          {trainerProfile?.approved
            ? "Trainer has approved"
            : "has no trainer approval, check the mail and contact admin for futher details ..!.If you are new to the app add your certificates ."}
        </div>
       {!trainerProfile?.approved && trainerProfile?.rejectedDate && (() => {
    const rejectedDate = new Date(trainerProfile.rejectedDate);
    const now = new Date();
    const diffInDays = (now.getTime() - rejectedDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays >= 30 ? (
      <Button
      className="mt-4 bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436]"
      >
       Request Approval
      </Button>
    ) : <p className="text-[#FFC436] text-sm font-medium mb-1">you have to wait {Math.floor(30-diffInDays)} days as cooldown time to request approval,</p>;
  })()}
      </div>

      <div className="w-full min-h-screen bg-black/30 p-8">
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => {
              if (certificatePdfInput.current) {
                certificatePdfInput.current.click();
              }
            }}
            className="bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436]"
          >
            Add Certificate
          </Button>
          <input
            type="file"
            onChange={handleCertificateUpload}
            className="hidden"
            ref={certificatePdfInput}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCertificates?.map((certificate, index) => (
            <div
              key={index}
              className="bg-black/30 rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              <iframe
                src={certificate}
                className="w-full h-[200px]  border rounded-lg"
                title={`Trainer Certificate ${index + 1}`}
              />
              <a target="_blank" href={certificate} rel="noopener noreferrer">
                <Button className="mt-4 bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436]">
                  View
                </Button>
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={prevPage}
            className="px-4 py-2 bg-[#FFC436] hover:bg-black hover:text-[#FFC436] text-black rounded mr-2"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-[#FFC436] hover:bg-black hover:text-[#FFC436] text-black rounded">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-[#FFC436] hover:bg-black hover:text-[#FFC436] text-black rounded ml-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
