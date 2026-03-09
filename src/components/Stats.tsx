import { stats } from "@/data/stats"
import FadeInView from "./FadeInView"

const Stats: React.FC = () => {
    return (
        <section id="stats" className="py-12 lg:py-20">
            <div className="grid sm:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <FadeInView key={stat.title} delay={i * 0.1}>
                        <div className="p-7 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all">
                            <h3 className="mb-3 flex items-center gap-2 text-3xl font-bold text-secondary justify-center sm:justify-start">
                                {stat.icon}
                                {stat.title}
                            </h3>
                            <p className="text-foreground-accent text-sm leading-relaxed text-center sm:text-left">{stat.description}</p>
                        </div>
                    </FadeInView>
                ))}
            </div>
        </section>
    )
}

export default Stats