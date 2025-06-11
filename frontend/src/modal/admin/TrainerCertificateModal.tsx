import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
    isOpen:boolean;
    onClose:()=>void;
    trainerCertificates:string[]
    
}
const TrainerCertificateModal = ({isOpen,onClose,trainerCertificates}:Props) => {
   
  const [currentCertificates,setCurrentCertificates] = useState<string[]>([])
  useEffect(()=>{
      setCurrentCertificates(trainerCertificates)
  },[])
  if(!isOpen) return null
  return (
   <div className="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto px-4 py-30">
      <div className="rounded-lg p-6 max-w-4xl w-full max-h-[90vh] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          Trainer Certificates
        </h2>

          <div className="flex flex-wrap justify-center gap-6 bg-black/20 text-white">
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
          ))}d
          </div>
      </div>
    </div>
  )
}

export default TrainerCertificateModal
