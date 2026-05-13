import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  const { name, date, rating, text, avatarGrad, initial } = review;
  return (
    <div className="bg-[#111827] border border-white/[0.07] rounded-[18px] p-[14px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarGrad} flex items-center justify-center text-[12px] font-bold text-white font-['Syne',sans-serif] flex-shrink-0`}
          >
            {initial}
          </div>
          <div>
            <p className="text-[13px] font-semibold font-['Syne',sans-serif] text-[#F9FAFB]">
              {name}
            </p>
            <p className="text-[11px] text-[#9CA3AF]">{date}</p>
          </div>
        </div>
        <div className="flex gap-px">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < rating ? "text-[#F59E0B]" : "text-[#9CA3AF]/30"}
              fill="currentColor"
            />
          ))}
        </div>
      </div>
      <p className="text-[12.5px] text-[#9CA3AF] leading-relaxed">{text}</p>
    </div>
  ); 
}
