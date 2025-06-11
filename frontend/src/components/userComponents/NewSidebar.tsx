import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Upload, Camera } from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { uploadFile } from "@/api/file-upload";
interface SidebarProps {
  items: string[][];
  profilePicture?: string;
  role: "user" | "admin" | "trainer";
  uploadProfilePicApi?: (profilePic: string) => Promise<any>;
}

const NewSidebar: React.FC<SidebarProps> = ({
  items,
  profilePicture,
  role,
  uploadProfilePicApi,
}) => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [userPic, setUserProfilePic] = useState<string>(
    profilePicture as string
  );

  const handleInputClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (uploadProfilePicApi) {
        const fileList = event.target.files;
        const uploadFileResponse = await uploadFile(
          fileList as FileList,
          `${role}-profilepic`
        );
        if (uploadFileResponse.data) {
          console.log("this is url", uploadFileResponse.data.url);

          const response = await uploadProfilePicApi(
            uploadFileResponse.data.url
          );
          console.log("response", response);
          if (!response?.data.success) {
            throw new Error();
          }
          showSuccessToast(response?.data.message);
          setUserProfilePic(() => {
            console.log("this is setimageurl", response.data.image);
            return response.data.image;
          });
        }
      }
    } catch (error) {
      showErrorToast(error);
      console.log(error);
    }
  };
  useEffect(() => {
    if (profilePicture) {
      setUserProfilePic(profilePicture);
    }
  }, [profilePicture]);
  return (
    <div className="w-64 bg-black/95 border-r border-white/10 p-6 pt-20 hidden md:block">
      <div className="mb-8 text-center">
        <div
          className="relative w-32 h-32 mx-auto mb-4"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className={`
            absolute inset-0 rounded-full overflow-hidden
            ${isHovering ? "bg-amber-300" : ""}
            transition-all duration-200
          `}
          >
            {userPic ? (
              <img
                src={userPic}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={() => {
                  console.log("Image failed to load:", userPic);
                  setUserProfilePic("");
                }}
              />
            ) : (
              <div className="w-full h-full bg-warm-yellow/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-warm-yellow" />
              </div>
            )}
          </div>

          {uploadProfilePicApi && isHovering && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center bg-black/75 rounded-full"
            >
              <Upload className="w-6 h-6 text-warm-yellow" />
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputClick}
            className="hidden"
          />
        </div>
        <h2 className="text-lg font-semibold text-warm-yellow capitalize">
          {role}
        </h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {items.map(([label, path]) => (
          <>
          <Link
            key={path}
            to={path}
            className={`
              block px-4 py-2 rounded-lg transition-colors duration-200
              capitalize text-sm font-medium
              ${
                location.pathname.includes(path)
                  ? "bg-warm-yellow/20 text-warm-yellow"
                  : "text-white/70 hover:bg-[#FFC436] hover:text-black"
              }
            `}
          >
            {label}
          </Link>
          </>
        ))}
      </nav>
    </div>
  );
};

export default NewSidebar;
