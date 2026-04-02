import SectionTitle from "./SectionTitle";
import FadeInView from "./FadeInView";

interface Props {
    id: string;
    title: string;
    description: string;
}

const Section: React.FC<React.PropsWithChildren<Props>> = ({ id, title, description, children }: React.PropsWithChildren<Props>) => {
    return (
        <section id={id} className="relative py-12 lg:py-24 overflow-hidden bg-gray-50">
            <FadeInView>
                <SectionTitle>
                    <h2 className="text-center mb-4">{title}</h2>
                </SectionTitle>
                <p className="mb-12 text-center text-foreground-accent max-w-2xl mx-auto">{description}</p>
            </FadeInView>
            {children}
        </section>
    )
}

export default Section