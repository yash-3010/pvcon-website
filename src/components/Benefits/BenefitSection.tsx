import Image from "next/image";
import clsx from "clsx";
import { IBenefit } from "@/types";
import BenefitBullet from "./BenefitBullet";
import SectionTitle from "../SectionTitle";
import BenefitMotionWrapper from "./BenefitMotionWrapper";

interface Props {
  benefit: IBenefit;
  imageAtRight?: boolean;
}

const BenefitSection: React.FC<Props> = ({ benefit, imageAtRight }) => {
  const { title, description, imageSrc, bullets } = benefit;

  return (
    <section className="benefit-section" aria-label={title}>
      <BenefitMotionWrapper>
        <div className="flex flex-wrap flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20 lg:flex-nowrap mb-24">
          
          <div className={clsx("flex flex-wrap items-center w-full max-w-lg", {
            "justify-start": imageAtRight,
            "lg:order-1 justify-end": !imageAtRight
          })}>
            <div className="w-full text-center lg:text-left">
              <SectionTitle>
                <h3 className="lg:max-w-2xl">{title}</h3>
              </SectionTitle>
              <p className="mt-1.5 mx-auto lg:ml-0 leading-normal text-foreground-accent">
                {description}
              </p>
              <div className="mx-auto lg:ml-0 w-full">
                {bullets.map((item, index) => (
                  <BenefitBullet
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={clsx("mt-5 lg:mt-0", { "lg:order-2": imageAtRight })}>
            <div className={clsx("w-fit flex", {
              "justify-start": imageAtRight,
              "justify-end": !imageAtRight
            })}>
              <Image
                src={imageSrc}
                alt={title}
                width={480}
                height={360}
                quality={80}
                sizes="(max-width: 768px) 100vw, 480px"
                loading="lazy"
                className="lg:ml-0 rounded-xl object-cover shadow-sm"
              />
            </div>
          </div>

        </div>
      </BenefitMotionWrapper>
    </section>
  );
};

export default BenefitSection;