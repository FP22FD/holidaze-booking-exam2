interface FacilityProps {
  icon: React.ReactNode;
  label: string;
}

export const Facility = ({ icon, label }: FacilityProps) => (
  <div className="flex items-center border py-1 px-2 rounded text-body-medium">
    {icon}
    <span className="pl-1">{label}</span>
  </div>
);
