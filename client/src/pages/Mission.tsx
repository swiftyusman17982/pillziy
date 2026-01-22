export default function Mission() {
        return (

                <section className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
                        <div className="container mx-auto px-4">
                                {/* Mission Statement + Image Section */}
                                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                        {/* Left: Text */}
                                        <div className="space-y-10">
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight">
                                                        Our Mission
                                                </h1>

                                                <div className="space-y-8 text-lg md:text-xl text-slate-700 leading-relaxed">
                                                        <p className="font-semibold text-slate-900 text-xl">
                                                                To eliminate medication confusion on a global scale.
                                                        </p>

                                                        <p>
                                                                We transform complex prescriptions into AI-powered, 3D visual experiences that patients actually understand. By removing language and literacy barriers, we ensure no one has to guess how to take their medicine safely. We are building the universal "understanding layer" for healthcare restoring dignity to patients and peace of mind to caregivers.
                                                        </p>
                                                </div>
                                        </div>

                                        {/* Right: Image */}
                                        {/* Right: Image */}
                                        <div className="relative rounded-2xl overflow-hidden ">

                                                <img
                                                        src="/image/Our_Mission.png"
                                                        alt="PILLziy Mission - Empowering Medication Understanding"
                                                        className="w-full h-auto object-contain lg:aspect-[3/3] lg:aspect-square"
                                                />

                                        </div>
                                </div>
                        </div>
                </section>

        );
}