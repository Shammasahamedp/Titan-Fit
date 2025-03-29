import { IselectFieldProps } from "@/interfaces/IselectFieldProps"

const SelectField = ({label,register,error,options}:IselectFieldProps) => {
  return (
    <div className="mt-6">
        <label className="block text-black text-sm font-medium">{label}</label>
        <select {...register}
        defaultValue=""
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 outline-none ${
                error?"border-red-500 focus:ring-red-500":"border-gray-300 focus:ring-gray-500"
            }`}
        >
            <option value="" disabled>Select an option</option>
            {
                options.map((opt)=>
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                )
                
            }
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default SelectField
