import { useAuth } from "../../context/Auth";
import { getOrders } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import OrderSkeleton from "./OrdersSkeleton";

interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    category: {
      id: number;
      name: string;
      description: string;
      image: string;
    };
    images: { id: number; image: string; product: number }[];
    in_stock: boolean;
    original_price: string;
    selling_price: string;
    brand: string;
    product_type: string;
    is_liked: boolean;
  };
  quantity: number;
  price: string;
  my_rating: null | number;
}

interface OrderData {
  id: number;
  status: string;
  total_price: string;
  discount_applied: string;
  final_price: string;
  created_at: string;
  updated_at: string;
  delivery_address: {
    id: number;
    address_line_1: string;
    address_line_2: string | null;
    city: string;
    state: string;
    country: string;
    pincode: string;
    address_type: string;
  };
  items: {
    id: number;
    product: {
      id: number;
      name: string;
      description: string;
      category: {
        id: number;
        name: string;
        description: string;
        image: string;
      };
      images: { id: number; image: string; product: number }[];
      in_stock: boolean;
      original_price: string;
      selling_price: string;
      brand: string;
      product_type: string;
      is_liked: boolean;
    };
    quantity: number;
    price: string;
    my_rating: null | number;
  }[];
}

const OrderDetails = () => {
  const { accessToken } = useAuth();
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderItems", accessToken],
    queryFn: async () => getOrders(accessToken as string),
    enabled: !!accessToken,
  });

  if (isLoading) return <OrderSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const order = orders?.data;

  return (
    <div className="w-full min-h-screen p-4 mt-20 flex justify-center dark:text-white">
      <div>
        {order?.length === 0 ? (
          <div className="flex flex-col items-center  gap-5 justify-center  w-full">
            <div className=" text-center text-2xl">No orders found.</div>
            <button className=" text-white bg-black px-4 py-2 w-fit uppercase font-semibold dark:bg-white dark:text-black">
              Products
            </button>
          </div>
        ) : (
          <div>
            {order?.map((orderItem: OrderItem) => (
              <div
                key={orderItem.id}
                className="max-w-7xl mx-auto bg-white dark:bg-black/50 rounded-lg shadow-lg p-6 mb-8"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Order Info Panel */}
                  <div className="lg:w-1/3 space-y-6">
                    {/* Order Summary Card */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
                      <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                      </h2>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-gray-600 dark:text-gray-300">
                          Order ID:
                        </p>
                        <p className="font-medium">{orderItem.id}</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Status:
                        </p>
                        <p className="font-medium">{orderItem.status}</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Total Price:
                        </p>
                        <p className="font-medium">₹{orderItem.total_price}</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Discount:
                        </p>
                        <p className="font-medium">
                          ₹{orderItem.discount_applied}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Final Price:
                        </p>
                        <p className="font-medium">₹{orderItem.final_price}</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Created:
                        </p>
                        <p className="font-medium">
                          {new Date(orderItem.created_at).toLocaleString()}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Updated:
                        </p>
                        <p className="font-medium">
                          {new Date(orderItem.updated_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Address Card */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
                      <h2 className="text-xl font-semibold mb-4">
                        Delivery Address
                      </h2>
                      <div className="space-y-2">
                        <p>{orderItem.delivery_address.address_line_1}</p>
                        {orderItem.delivery_address.address_line_2 && (
                          <p>{orderItem.delivery_address.address_line_2}</p>
                        )}
                        <p>
                          {orderItem.delivery_address.city},{" "}
                          {orderItem.delivery_address.state}
                        </p>
                        <p>
                          {orderItem.delivery_address.country} -{" "}
                          {orderItem.delivery_address.pincode}
                        </p>
                        <p className="font-medium">
                          Type: {orderItem.delivery_address.address_type}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="lg:w-2/3">
                    <h2 className="text-xl font-semibold mb-6">
                      Ordered Products
                    </h2>
                    <div className="space-y-6">
                      {orderItem.items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 flex flex-col md:flex-row gap-4"
                        >
                          <div className="md:w-1/3">
                            <img
                              src={item.product.images[0]?.image}
                              alt={item.product.name}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                          <div className="md:w-2/3 space-y-2">
                            <h3 className="text-lg font-semibold">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {item.product.description}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <p className="text-gray-600 dark:text-gray-300">
                                Brand:
                              </p>
                              <p>{item.product.brand}</p>
                              <p className="text-gray-600 dark:text-gray-300">
                                Quantity:
                              </p>
                              <p>{item.quantity}</p>
                              <p className="text-gray-600 dark:text-gray-300">
                                Original Price:
                              </p>
                              <p>₹{item.product.original_price}</p>
                              <p className="text-gray-600 dark:text-gray-300">
                                Selling Price:
                              </p>
                              <p>₹{item.product.selling_price}</p>
                              <p className="text-gray-600 dark:text-gray-300">
                                Total:
                              </p>
                              <p className="font-medium">₹{item.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
