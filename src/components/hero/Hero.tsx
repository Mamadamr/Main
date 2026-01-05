import HeroTitle from "./Herotitle";
import HeroSubtitle from "./HeroSubtitle";
import HeroCTA from "./HeroCTA";

export default function Hero() {
    return (
        <section className="min-h-[44vh] flex flex-col items-center justify-center bg-white text-center">
            <HeroCTA/>
            <HeroTitle/>
            <HeroSubtitle/>
        </section>
    )
}