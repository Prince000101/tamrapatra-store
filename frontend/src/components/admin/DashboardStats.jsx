import { DollarSign, ShoppingBag, Package, Users, CheckCircle, Clock } from "lucide-react";

const iconMap = {
  revenue: DollarSign,
  orders: ShoppingBag,
  products: Package,
  users: Users,
  paidOrders: CheckCircle,
  deliveredOrders: CheckCircle,
};

const DashboardStats = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
      {stats.map((stat, idx) => {
        const Icon = iconMap[stat.key] || Package;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-plum-light shadow-sm border border-gray-100 dark:border-indigo-light/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:shadow-md transition-shadow"
          >
            <div className="mx-auto mb-2 w-10 h-10 rounded-lg bg-indigo/10 dark:bg-warm-grey/10 flex items-center justify-center">
              <Icon size={18} className="text-indigo dark:text-warm-grey" />
            </div>
            <h3 className="text-xs sm:text-sm font-body font-medium text-gray-500 dark:text-ivory/60 truncate">
              {stat.label}
            </h3>
            <p className="text-lg sm:text-xl font-bold text-indigo dark:text-warm-grey mt-0.5">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
