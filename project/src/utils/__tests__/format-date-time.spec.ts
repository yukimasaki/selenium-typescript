import { formatTime, formatDate } from "@/utils/format-date-time";

describe("formatDateTime.ts", () => {
  describe("formatTime", () => {
    it("時間を正しくフォーマットできること", () => {
      const time = new Date("2024-01-01T09:30:00");
      const result = formatTime(time);
      expect(result).toBe("09:30");
    });

    it("分が1桁の場合も正しくフォーマットできること", () => {
      const time = new Date("2024-01-01T14:05:00");
      const result = formatTime(time);
      expect(result).toBe("14:05");
    });

    it("時が1桁の場合も正しくフォーマットできること", () => {
      const time = new Date("2024-01-01T08:45:00");
      const result = formatTime(time);
      expect(result).toBe("08:45");
    });
  });

  describe("formatDate", () => {
    it("日付を正しくフォーマットできること", () => {
      const date = new Date("2024-01-01T09:30:00");
      const result = formatDate(date);
      expect(result).toBe("2024-01-01");
    });

    it("月が1桁の場合も正しくフォーマットできること", () => {
      const date = new Date("2024-03-05T14:05:00");
      const result = formatDate(date);
      expect(result).toBe("2024-03-05");
    });

    it("日が1桁の場合も正しくフォーマットできること", () => {
      const date = new Date("2024-12-08T08:45:00");
      const result = formatDate(date);
      expect(result).toBe("2024-12-08");
    });

    it("年末の日付も正しくフォーマットできること", () => {
      const date = new Date("2024-12-31T23:59:59");
      const result = formatDate(date);
      expect(result).toBe("2024-12-31");
    });
  });
});
