import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userAuthAPI } from "../services/api";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await userAuthAPI.profile();

      setUser(res.data);

      setForm({
        name: res.data.name,
        phone: res.data.phone || "",
      });
    } catch (err) {
      toast.error("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      await userAuthAPI.updateProfile(form);

      toast.success("Profile updated");

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          ...form,
        })
      );
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );

  return (
    <div className="max-w-xl mx-auto py-16 px-4">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <div className="space-y-5">

        <input
          className="w-full border rounded-xl p-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="w-full border rounded-xl p-3 bg-gray-100"
          value={user.email}
          disabled
        />

        <input
          className="w-full border rounded-xl p-3"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <button
          onClick={saveProfile}
          className="w-full bg-[#B8865B] text-white rounded-xl py-3"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}