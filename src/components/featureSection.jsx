import React from "react";
import {
  Tag,
  Truck,
  BadgePercent,
  Layers,
  RefreshCcw
} from "lucide-react";

const FeaturesSection = () => {

  const features = [
    {
      icon: <Tag />,
      title: "Best prices & offers",
      desc: "Orders $50 or more"
    },
    {
      icon: <Truck />,
      title: "Free delivery",
      desc: "24/7 amazing services"
    },
    {
      icon: <BadgePercent />,
      title: "Great daily deal",
      desc: "When you sign up"
    },
    {
      icon: <Layers />,
      title: "Wide assortment",
      desc: "Mega discounts"
    },
    {
      icon: <RefreshCcw />,
      title: "Easy returns",
      desc: "Within 30 days"
    }
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-[#f8faf9] rounded-xl p-5 border border-emerald-100 hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                {item.icon}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
