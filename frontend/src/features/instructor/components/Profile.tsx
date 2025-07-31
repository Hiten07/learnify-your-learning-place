import { useEffect, useState } from "react";
import { coursesgetApis } from "../../../api/course.api";

interface ProfileData {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  bio: string;
  instructordetails: {
    qualification: string;
    experience: number;
  };
  paymentDetails?: {
    upiId?: string;
    bankAccount?: string;
  };
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  // Form states
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    bio: "",
    qualification: "",
    experience: "",
  });

  const [upiId, setUpiId] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await coursesgetApis("/users/instructor/profile", {});
        const data = response.data;
        setProfile(response.data);

        setForm({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          phonenumber: data.phonenumber || "",
          bio: data.instructordetails.bio || "",
          qualification: data.instructordetails?.qualification || "",
          experience: data.instructordetails?.experience?.toString() || "",
        });

        setUpiId(data?.paymentDetails?.upiId || "");
        setBankAccount(data?.paymentDetails?.bankAccount || "");
      } catch (error) {
        console.error("Error fetching instructor profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    console.log("Saving profile data:", form);
    setIsEditingProfile(false);
  };

  const handleSavePayment = () => {
    setIsEditingPayment(false);
  };

  if (!profile) return <div className="p-10 text-center text-lg">Loading...</div>;

  return (
    <div className="w-full px-6 py-10 space-y-10 bg-gray-50 min-h-screen flex flex-col items-center">
    
      <div className="w-full max-w-3/4 bg-white shadow-md rounded-lg p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-sm text-white px-4 py-2"
          >
            {isEditingProfile ? "Cancel" : "Update Profile"}
          </button>
        </div>

        {isEditingProfile ? (
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">First name : </label>
            <input
              name="firstname"
              placeholder="First Name"
              value={form.firstname}
              onChange={handleProfileChange}
              className="w-full p-3 border rounded"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Last name : </label>
            <input
              name="lastname"
              placeholder="Last Name"
              value={form.lastname}
              onChange={handleProfileChange}
              className="w-full p-3 border rounded"
            />
            </div>

            <div>
            <label className="text-sm font-medium text-gray-600 mb-2">Phone number : </label>
            <input
              name="phonenumber"
              placeholder="Phone Number"
              value={form.phonenumber}
              onChange={handleProfileChange}
              className="p-3 border rounded w-full"
            />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Qualifications : </label>
              <input
                name="qualification"
                placeholder="Qualification"
                value={form.qualification}
                onChange={handleProfileChange}
                className="p-3 border rounded w-full"
              />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Experience : </label>
            <input
              name="experience"
              placeholder="Experience (in years)"
              value={form.experience}
              onChange={handleProfileChange}
              className="p-3 mt-1 border rounded w-full"
            />
            </div>
          <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">About : </label>
            <textarea
              name="bio"
              placeholder="Bio"
              value={form.bio}
              onChange={handleProfileChange}
              className="p-3 border rounded w-full md:col-span-2"
              rows={4}
            />
          </div>
            <div className="md:col-span-2">
              <button
                onClick={handleSaveProfile}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Save Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p><strong>First Name:</strong> {profile.firstname}</p>
            <p><strong>Last Name:</strong> {profile.lastname}</p>
            <p><strong>Phone Number:</strong> {profile.phonenumber}</p>
            <p><strong>Qualification:</strong> {profile.instructordetails.qualification}</p>
            <p><strong>Experience:</strong> {profile.instructordetails.experience} years</p>
            <div className="md:col-span-2">
              <p><strong>About me : </strong></p>
              <p className="mt-2">{profile.instructordetails.bio}</p>
            </div>
          </div>
        )}
      </div>

      
      <div className="w-full max-w-3/4 bg-white shadow-md rounded-lg p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Payment Details</h2>
          <button
            onClick={() => setIsEditingPayment(!isEditingPayment)}
            className="text-sm text-white px-4 py-2"
          >
            {isEditingPayment ? "Cancel" : (upiId || bankAccount ? "Edit" : "Add")} Payment Info
          </button>
        </div>

        {isEditingPayment ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full mt-1 p-3 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Bank Account Number</label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full mt-1 p-3 border rounded-md"
              />
            </div>
            <button
              onClick={handleSavePayment}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Payment Details
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>UPI ID:</strong> {upiId || "Not added"}</p>
            <p><strong>Bank Account:</strong> {bankAccount || "Not added"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
