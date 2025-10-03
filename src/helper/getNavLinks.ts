import Role from "@/constent/Role";

const getNavLinks = (data: any) => {
  const { data: user } = data || {};
  console.log("nav", user);
  switch (user?.role) {
    case Role.ADMIN:
      break;
    case Role.RIDER:
      return [
        { href: "/", label: "Home" },
        { href: "/", label: "Features" },
        { href: "/ride/take-ride", label: "Take Ride" },
        { href: "#", label: "About" },
      ];

    case Role.DRIVER:
      return [
        { href: "/", label: "Home" },
        { href: "#", label: "Features" },
        // { href: "/ride/take-ride", label: "Take Ride" },
        { href: "/driver/choose-ride", label: "Share Ride" },

        // { href: "#", label: "Pricing" },
        { href: "#", label: "About" },
      ];

    default:
      return [
        { href: "/", label: "Home" },
        { href: "#", label: "Features" },
        { href: "#", label: "About" },
      ];
  }
};

export default getNavLinks;
