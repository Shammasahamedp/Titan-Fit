import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISidebarProps } from "@/interfaces/IsidebarProps";
import { Menu, X } from "lucide-react"; // Icons for menu and close
import { Button } from "../ui/button";
import { useRef } from "react";
import { uploadFile } from "@/api/file-upload";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { userErrors } from "@/messages/userside-error";

const SideBar: React.FC<ISidebarProps> = ({ items,profilePicture,role,uploadProfilePicApi }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [imgUrl,setimgUrl] = useState('')
  const profileImageInput = useRef<HTMLInputElement>(null)
  const toggleSidebar = () => setIsOpen(!isOpen);
  
    const handleInputClick = async(event:React.ChangeEvent<HTMLInputElement>)=>{
      try {
        if(uploadProfilePicApi){
          const fileList = event.target.files
          const uploadFileResponse = await uploadFile(fileList as FileList,`${role}-profilepic`)
          if(uploadFileResponse.data){
            console.log('this is url',uploadFileResponse.data.url)
           
           const response = await uploadProfilePicApi(uploadFileResponse.data.url)
           console.log(response)
           if(!response?.data.success){
            throw new Error()
           }
           showSuccessToast(response?.data.message)
           setimgUrl(response.data.image)
          }
        }
       
      } catch (error) {
          console.log(error)
          showErrorToast(userErrors.PROFILE_PIC_UPLOAD_ERROR)
      }
     }
   
   useEffect(()=>{
    if(profilePicture){
      setimgUrl(profilePicture)
    }
   },[profilePicture])
  return (
    <>
      {/* Hamburger Button (Only Visible on Small Screens) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#FFC436] text-black p-2 rounded"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar with Solid Background (for Mobile) */}
      {isOpen && <div className="fixed inset-0 bg-black md:hidden"></div>}

      {/* Sidebar */}
      <div
  className={`fixed top-0 left-0  h-full  w-64 bg-black border-r border-[#FFC436] p-4 transition-transform z-50 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }   md:translate-x-0`}
>
        {/* Close Button for Mobile */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-[#FFC436] md:hidden"
        >
          <X size={24} />
        </button>
        <div className="mb-6 flex justify-center">
  <img src="/titan-fit.png" alt="Logo" className="h-10" />
</div>

  <h2 className="text-3xl text-center font-bold mb-4 ">My Panel</h2>
  <div className="flex flex-col items-center justify-center ">
    {role !== 'admin'?<>{imgUrl || profilePicture ? (
    <img src={imgUrl} className= {`w-20 h-20 rounded-2xl flex-1  pb-2`} alt="profile " />
  ):(
    <div className="w-20 h-20 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-500">No image</div>
  )}</>:<></>}
  
  {role !== 'admin' && (<><input type="file" onChange={handleInputClick} className="hidden" ref={profileImageInput}  />
  <Button onClick={()=>{if (profileImageInput.current){profileImageInput.current.click()}}} className="flex-1 bg-[#FFC436] text-black hover:bg-black hover:text-[#FFC436] ">{profilePicture?'Change':'Add'}</Button></>)}
  </div>
        <nav className="space-y-4 mt-8">
        
          {items.map((item, index) => (
            <button
              onClick={() => {
                navigate(`/${role}/${item[1]}`);
                setIsOpen(false); // Close sidebar after navigation
              }}
              key={index}
              className="block w-full text-center p-2 hover:bg-[#FFC436] hover:text-black transition rounded"
            >
              {item[0]}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
