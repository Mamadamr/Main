import Container from "../ui/Container";
import FeatureGrid from "./FeaturesGrid";

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">"چرا؟=)"</h2>
        <FeatureGrid />
      </Container>
    </section>
  );
}
