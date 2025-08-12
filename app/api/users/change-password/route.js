export async function POST(req) {
  try {
    const body = await req.json();
    const { email, oldPassword, newPassword, confirmNewPassword } = body;

    if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      return Response.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    if (newPassword !== confirmNewPassword) {
      return Response.json({ success: false, message: "New passwords do not match" }, { status: 400 });
    }

    // ✅ Add your DB logic to validate old password and update the new one
    console.log("Received password change request for:", email);

    return Response.json({
      success: true,
      message: "Password updated successfully!"
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
