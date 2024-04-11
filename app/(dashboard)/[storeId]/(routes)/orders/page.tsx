import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderColumn } from "./components/columns"
import { OrderClient } from "./components/client";


const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const wilayas: string[] = [
            'أدرار',
            'الشلف',
            'الأغواط',
            'أم البواقي',
            'باتنة',
            'بسكرة',
            'بشار',
            'البليدة',
            'بويرة',
            'تمنراست',
            'تبسة',
            'تلمسان',
            'تلمسان',
            'تيارت',
            'تيزي وزو',
            'الجزائر',
            'الجلفة',
            'جيجل',
            'سطيف',
            'سعيدة',
            'سكيكدة',
            'سيدي بلعباس',
            'عنابة',
            'قالمة',
            'قسنطينة',
            'المدية',
            'مستغانم',
            'المسيلة',
            'معسكر',
            'ورقلة',
            'وهران',
            'بيض',
            'يزي',
            'تندوف',
            'وادي الوادي',
            'خنشلة',
            'سوق أهراس',
            'تيبازة',
            'ميلة',
            'عين الدفلى',
            'النعامة',
            'تيمسيلت',
            'الوادي',
            'كھنشلة',
            'سوق أهراس',
            'تيبازة',
            'غرداية',
            'غليزان',
            'تيميمون',
            'برج باجي مختار',
            'أولاد جلال',
            'بني عباس',
            'عين صالح',
            'عين قزّام',
            'تقرت',
            'جانت',
            'المغير',
            'المنيعة'
  ]

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    address: item.address,
    wilaya: wilayas[item.wilaya - 1],
    desc: item.desc,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
