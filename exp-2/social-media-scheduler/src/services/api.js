export const fetchPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Welcome Post",
          content: "Launching our Social Media Scheduler!",
          platform: "Facebook",
          schedule: "2026-07-25"
        },
        {
          id: 2,
          title: "Promotion",
          content: "50% Discount Today",
          platform: "Instagram",
          schedule: "2026-07-26"
        }
      ]);
    }, 1000);
  });
};