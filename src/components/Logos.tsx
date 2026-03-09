const Logos: React.FC = () => {
    return (
        <section id="logos" className="py-20 px-5 bg-background">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-lg font-medium">
                    Trusted by <span className="text-secondary font-bold">MAHs, CROs & Sponsors</span> across the globe
                </p>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-bold text-secondary">50+</p>
                        <p className="text-sm text-foreground-accent mt-1">Clients Served</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-bold text-secondary">15+</p>
                        <p className="text-sm text-foreground-accent mt-1">Countries</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-bold text-secondary">100%</p>
                        <p className="text-sm text-foreground-accent mt-1">Audit Success Rate</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-bold text-secondary">10+</p>
                        <p className="text-sm text-foreground-accent mt-1">Years Experience</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Logos
