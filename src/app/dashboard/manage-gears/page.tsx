import { getProviderOrders } from "@/services/order/order.actions";
import ProviderOrdersClient from "../_components/ProviderOrdersClient";


export default async function ManageGearsPage() {
    const orders = await getProviderOrders();
    console.log()
    return <ProviderOrdersClient initialOrders={orders} />;
};