import BenefitSection from "./BenefitSection";
import { benefits } from "@/data/benefits";

const Benefits: React.FC = () => {
  return (
    <div id="services" role="region" aria-labelledby="services-heading">
      <h2 id="services-heading" className="sr-only">Services</h2>
      {benefits.map((item, index) => (
        <BenefitSection key={index} benefit={item} imageAtRight={index % 2 !== 0} />
      ))}
    </div>
  );
};

export default Benefits;