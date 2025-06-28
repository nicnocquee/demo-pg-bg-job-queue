export const generateReport = async (reportId: string, userId: string) => {
  console.log(`Generating report for ${reportId} with user ${userId}`);

  // Simulate report generation with 1-3 seconds delay and a 50% chance of failure
  await new Promise(
    (resolve, reject) =>
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(true);
        } else {
          reject(new Error("Report generation failed"));
        }
      }, Math.random() * 2000 + 1000) // 1-3 seconds
  );

  console.log(`Report generated for ${reportId} with user ${userId}`);
};
