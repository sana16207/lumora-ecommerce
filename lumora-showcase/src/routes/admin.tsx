import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line,
  Cell,
} from "recharts";
export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
};

type Order = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  status: string;
};

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  blocked: boolean;
};

function AdminPage() {
  const { user } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

const [form, setForm] = useState({
  name: "",
  description: "",
  price: "",
  stock: "",
  imageUrl: "",
  category: "",
});

useEffect(() => {
  if (!user || user.role !== "ADMIN") return;

  fetchProducts();
  fetchOrders();
  fetchUsers();
}, [user]);

if (!user) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold">Loading...</h1>
    </div>
  );
}

if (user.role !== "ADMIN") {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold">Access Denied</h1>
      <p className="mt-4 text-gray-500">Admin access only.</p>
    </div>
  );
}

  async function fetchProducts() {
    try {
      const res = await fetch("http://localhost:8080/api/products");
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Failed to fetch products");
    }
  }

  async function fetchOrders() {
    try {
      const res = await fetch("http://localhost:8080/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch {
      toast.error("Failed to fetch orders");
    }
  }

  async function fetchUsers() {
    try {
      const res = await fetch("http://localhost:8080/api/users");
      const data = await res.json();
      setUsers(data);
    } catch {
      toast.error("Failed to fetch users");
    }
  }

  

  async function addProduct() {
    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          stock: Number(form.stock),
          imageUrl: form.imageUrl,
          category: form.category,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Product added");

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        category: "",
      });

      fetchProducts();
    } catch {
      toast.error("Add product failed");
    }
  }

  async function deleteProduct(id: number) {
    try {
      await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
      });

      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  }

  async function updateProduct() {
    if (!editingProduct) return;

    try {
      await fetch(`http://localhost:8080/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingProduct),
      });

      toast.success("Product updated");
      setEditingProduct(null);
      fetchProducts();
    } catch {
      toast.error("Update failed");
    }
  }

  async function updateOrderStatus(orderId: number, status: string) {
    try {
      await fetch(`http://localhost:8080/api/orders/status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      toast.success("Order updated");
      fetchOrders();
    } catch {
      toast.error("Order update failed");
    }
  }

  async function blockUser(id: number) {
    await fetch(`http://localhost:8080/api/users/block/${id}`, {
      method: "PUT",
    });

    fetchUsers();
    toast.success("User blocked");
  }

  async function unblockUser(id: number) {
    await fetch(`http://localhost:8080/api/users/unblock/${id}`, {
      method: "PUT",
    });

    fetchUsers();
    toast.success("User unblocked");
  }

  const lowStockProducts = products.filter(
  (p) => p.stock < 5
);

const totalRevenue = orders.reduce(
  (sum, order) => sum + order.totalPrice,
  0
);
const placed = orders.filter(
  (o) => o.status === "PLACED"
).length;

const processing = orders.filter(
  (o) => o.status === "PROCESSING"
).length;

const shipped = orders.filter(
  (o) => o.status === "SHIPPED"
).length;

const delivered = orders.filter(
  (o) => o.status === "DELIVERED"
).length;
const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);
const analyticsData = [
  { name: "Products", value: products.length },
  { name: "Orders", value: orders.length },
  { name: "Users", value: users.length },
];
const orderStatusData = [
  { status: "PLACED", count: placed },
  { status: "PROCESSING", count: processing },
  { status: "SHIPPED", count: shipped },
  { status: "DELIVERED", count: delivered },
];
const pieData = [
  { name: "PLACED", value: placed },
  { name: "PROCESSING", value: processing },
  { name: "SHIPPED", value: shipped },
  { name: "DELIVERED", value: delivered },
];
const COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
];
const revenueByStatusData = [
  { status: "PLACED", value: placed * 1000 },
  { status: "PROCESSING", value: processing * 1000 },
  { status: "SHIPPED", value: shipped * 1000 },
  { status: "DELIVERED", value: delivered * 1000 },
];
const revenueData = [
  {
    name: "Revenue",
    amount: totalRevenue,
  },
];
const monthlySalesData = [
  { month: "Jan", sales: 50000 },
  { month: "Feb", sales: 75000 },
  { month: "Mar", sales: 60000 },
  { month: "Apr", sales: 90000 },
  { month: "May", sales: 120000 },
  { month: "Jun", sales: 150000 },
];
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
<div className="flex justify-between items-center">
  <div>
    <h1 className="text-4xl font-bold">
      Welcome Back, Admin 👋
    </h1>

    <p className="text-gray-500 mt-2">
      Here's what's happening in your store today.
    </p>
  </div>
</div>
  <div className="grid md:grid-cols-4 gap-6">

  <div className="p-6 rounded-3xl border shadow-sm bg-gradient-to-br from-white to-slate-50">
    <h2 className="text-lg font-semibold">Products</h2>
    <p className="text-3xl font-bold mt-2">{products.length}</p>
  </div>
  

  <div className="p-6 rounded-3xl border shadow-sm bg-gradient-to-br from-white to-slate-50">
    <h2 className="text-lg font-semibold">Orders</h2>
    <p className="text-3xl font-bold mt-2">{orders.length}</p>
  </div>

  <div className="p-6 rounded-3xl border shadow-sm bg-gradient-to-br from-white to-slate-50">
    <h2 className="text-lg font-semibold">Users</h2>
    <p className="text-3xl font-bold mt-2">{users.length}</p>
  </div>

  <div className="p-6 rounded-3xl shadow-sm bg-gradient-to-r from-emerald-50 to-green-100 border">
    <h2 className="text-lg font-semibold">Revenue</h2>
    <p className="text-3xl font-bold mt-2">
      ₹{totalRevenue.toLocaleString()}
    </p>
  </div>

</div>
<div className="grid lg:grid-cols-2 gap-6">



  <div className="border rounded-3xl p-6 shadow-sm bg-white">

    <h2 className="text-xl font-bold mb-4">

      Analytics

    </h2>


    <ResponsiveContainer width="100%" height={300}>

      <BarChart data={analyticsData}>

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

<Bar
  dataKey="value"
  radius={[12, 12, 0, 0]}
/>
      </BarChart>

    </ResponsiveContainer>

  </div>
  <div className="border rounded-3xl p-6 shadow-sm bg-white">
  <h2 className="text-xl font-bold mb-4">
    Monthly Sales Trend
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={monthlySalesData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />

      <Line
        type="monotone"
        dataKey="sales"
        stroke="#2563eb"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
  <div className="border rounded-3xl p-6 shadow-sm bg-white">
  <h2 className="text-xl font-bold mb-4">
    Revenue By Status
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={revenueByStatusData}>
      <XAxis dataKey="status" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="value"
        radius={[12, 12, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>

<div className="border rounded-3xl p-6 shadow-sm bg-white">

  <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
  data={pieData}
  dataKey="value"
  nameKey="name"
  outerRadius={110}
  label
>
  {pieData.map((_, index) => (
    <Cell
      key={index}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
</div>


</div>


<div className="border rounded-3xl p-6 shadow-sm space-y-4 bg-white">
        <h2 className="text-2xl font-bold">Add Product</h2>

        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            placeholder={key}
            value={value}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
className="w-full border p-3 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
        ))}

        <button
          onClick={addProduct}
className="px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition"
>
          Add Product
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Products</h2>

        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
className="w-full border p-3 rounded-2xl shadow-sm"
/>

        {filteredProducts.map((product) => (
          <div key={product.id}className="border rounded-3xl p-6 shadow-sm hover:shadow-lg transition bg-white">
            {editingProduct?.id === product.id ? (
              <div className="space-y-3">
                <input
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />

                <input
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded"
                />

                <input
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: Number(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded"
                />

                <button
                  onClick={updateProduct}
className="px-4 py-2 bg-green-600 text-white rounded-xl"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
       <h3 className="font-bold text-xl">
  {product.name}
</h3>

<p className="text-gray-500">
  {product.category}
</p>

<p className="font-semibold mt-2">
  ₹{product.price}
</p>

<p className="text-sm text-gray-500">
  Stock: {product.stock}
</p>
                <div className="flex gap-3 mt-3">
                  <button
  onClick={() => setEditingProduct(product)}
  className="px-4 py-2 bg-blue-600 text-white rounded-xl"
>

                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
className="px-4 py-2 bg-red-600 text-white rounded-xl"
>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Orders</h2>

        {orders.map((order) => (
          <div key={order.id} className="border rounded-3xl p-5 shadow-sm hover:shadow-md transition">
            <p>Order #{order.id}</p>
            <p>User: {order.userId}</p>
            <p>Total: ₹{order.totalPrice}</p>
            <p>Status: {order.status}</p>
            <div className="flex gap-2 mt-3">
              {["PROCESSING", "SHIPPED", "DELIVERED"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateOrderStatus(order.id, status)}
                  className="px-3 py-2 bg-black text-white rounded"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Users</h2>

        {users.map((u) => (
          <div
            key={u.id}
            className="border rounded-3xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center"

          >
            <div>
              <p className="font-semibold">{u.name}</p>
              <p>{u.email}</p>
              <p>{u.role}</p>
            </div>

            {u.blocked ? (
              <button
                onClick={() => unblockUser(u.id)}
className="px-4 py-2 bg-green-600 text-white rounded-xl"
>
                Unblock
              </button>
            ) : (
              <button
                onClick={() => blockUser(u.id)}

className="px-4 py-2 bg-red-600 text-white rounded-xl">
                Block
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;