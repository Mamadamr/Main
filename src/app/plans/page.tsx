  import PlanCard from "../../components/ui/PlanCard";
  import { plans } from "@/data/plans";

  export default function PricingSection() {
    return (
      <section className="bg-background py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            پلن‌های Sarmin
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-16">
            پلنی را انتخاب کنید که متناسب با رشد کسب‌وکارتان باشد
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
            {plans.map((plan) => (
              <PlanCard key={plan.id} {...plan} />
            ))}
          </div>
        </div>
      </section>
    );
  }
