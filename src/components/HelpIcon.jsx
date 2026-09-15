import {
  Briefcase,
  Wind,
  Smile,
  Moon,
  Users,
  Cigarette,
  Activity,
  CircleDollarSign,
  Heart,
} from "lucide-react";

const ICONS = {
  briefcase: Briefcase,
  wind: Wind,
  smile: Smile,
  moon: Moon,
  users: Users,
  cigarette: Cigarette,
  activity: Activity,
  dollar: CircleDollarSign,
  heart: Heart,
};

export default function HelpIcon({ name, className }) {
  const Icon = ICONS[name] ?? Heart;
  return <Icon className={className} strokeWidth={1.5} />;
}
