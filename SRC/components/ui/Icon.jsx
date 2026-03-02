import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  Shield,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';

const ICONS = {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Sparkles,
  Shield,
  Code: Code2,
  Cpu,
  BarChart: BarChart3,
  Rocket,
  GraduationCap,
  Briefcase: BriefcaseBusiness,
  CheckCircle: CheckCircle2,
  Wrench,
  Database,
  Globe,
  Zap,
  MessageCircle,
};

const ICON_SIZES = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 22,
};

const ICON_COLORS = {
  muted: 'var(--text-muted)',
  secondary: 'var(--text-secondary)',
  accent: 'var(--accent-ai)',
  primary: 'var(--text-primary)',
};

export function Icon({
  name,
  size = 'md',
  color = 'muted',
  className = '',
  label,
}) {
  const LucideIcon = ICONS[name];

  if (!LucideIcon) {
    return null;
  }

  const resolvedSize = typeof size === 'number' ? size : ICON_SIZES[size] ?? ICON_SIZES.md;
  const resolvedColor = ICON_COLORS[color] ?? color ?? ICON_COLORS.muted;
  const classes = ['icon', className].filter(Boolean).join(' ');
  const isDecorative = !label;

  return (
    <span
      className={classes}
      style={{
        '--icon-size': `${resolvedSize}px`,
        '--icon-color': resolvedColor,
      }}
      aria-hidden={isDecorative ? 'true' : undefined}
    >
      <LucideIcon aria-hidden="true" focusable="false" size={resolvedSize} strokeWidth={1.9} />
      {label ? <span className="visually-hidden">{label}</span> : null}
    </span>
  );
}

export default Icon;
