import SkillDomain from "./SkillDomain";

interface Domain {
  title: string;
  description: string;
  tools: string[];
  variant?: "neutral" | "red" | "blue";
}

const SkillOrb = ({ domains }: { domains: Domain[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {domains.map((domain) => (
        <SkillDomain key={domain.title} {...domain} />
      ))}
    </div>
  );
};

export default SkillOrb;
