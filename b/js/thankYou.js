const SHEET_URL =
  "https://script.google.com/macros/s/AKfycby4MQxNN_yQ-VlXEwjHUExdHJb_f-1uwJn-SMyOCHddIkiNq3SZRhdRVwXitEVRIGQt/exec";

// Sana formatlash
function getFormattedDate() {
  const now = new Date();
  return now.toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Vaqt formatlash
function getFormattedTime() {
  return new Date().toLocaleTimeString("uz-UZ");
}

// Kunlik cheklov
function shouldSendToday(key) {
  const today = getFormattedDate();
  const lastDate = localStorage.getItem(key);

  if (lastDate === today) {
    return false;
  }

  localStorage.setItem(key, today);
  return true;
}

async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) {
    console.log("❌ Ma'lumotlar topilmadi");
    return;
  }

  // Kunlik cheklov
  if (!shouldSendToday("DataSendDate")) {
    console.log("⏩ Bugun allaqachon yuborilgan");
    return;
  }

  const formDataObj = JSON.parse(formDataRaw);

  const date = getFormattedDate();
  const time = getFormattedTime();

  const formData = new FormData();
  formData.append("Ism", formDataObj.Ism);
  formData.append("Telefon raqam", formDataObj.TelefonRaqam);
  formData.append("Biznes turi", formDataObj.BiznesTuri);
  formData.append("Royhatdan o'tgan vaqti", `${date} ${time}`);

  try {
    const response = await fetch(SHEET_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("✅ Ma'lumot yuborildi");
      localStorage.removeItem("formData");
    } else {
      throw new Error("API response was not ok");
    }
  } catch (error) {
    console.error("❌ Xatolik:", error);
    const errorBox = document.getElementById("errorMessage");
    if (errorBox) errorBox.style.display = "block";
  }
}

window.onload = sendFormData;
