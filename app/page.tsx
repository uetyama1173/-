"use client";
import { useState } from "react";
import { redirect } from "next/navigation"; 
import { validateForm } from "./utils/validationRules";

export default function WaterUsageForm() {
  const [memberName, setMemberName] = useState("");
  const [waterUsage, setWaterUsage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    const newErrors = { memberName: "", waterUsage: "" }; // メモ：　再定義する必要ある？
    validateForm(newErrors.memberName, newErrors.waterUsage);

    // // 組合員名の確認
    // if (memberName.trim() === "" || memberName.trim().length > 8){
    //   newErrors.memberName = "組合員名は8文字以下で入力してください"
    //   formIsValid = false;
    // }

    // // 水道使用量のチェック（0 より大きいかどうか）
    // const usageNumber = Number(waterUsage);
    // if (waterUsage === "" || isNaN(usageNumber) || usageNumber <= 0) {
    //   newErrors.waterUsage = "正しい水道使用量を入力してください";
    //   formIsValid = false;
    // }

    // if (!formIsValid) {
    //   // setErrors(newErrors);
    //   return;
    // }


    // データを保存（localStorageに追加）
    const storedData = JSON.parse(localStorage.getItem("waterData") || "[]");
    const newData = [...storedData, { memberName, waterUsage }];
    localStorage.setItem("waterData", JSON.stringify(newData));

    // ページ遷移（ここではリセットしない）
    redirect("/results");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">水道使用量入力フォーム</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* 組合員名 */}
        <div>
          <label className="block text-gray-700">組合員名:</label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="組合員名を入力"
            // required
          />
        </div>

        {/* 水道使用量 */}
        <div>
          <label className="block text-gray-700">水道使用量 (m³):</label>
          <input
            type="number"
            value={waterUsage}
            onChange={(e) => setWaterUsage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="使用量を入力"
            // required
          />
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          送信
        </button>
      </form>
    </div>
  );
}
