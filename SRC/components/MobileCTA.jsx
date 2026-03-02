import { useEffect, useMemo, useState } from 'react';
import Icon from './ui/Icon.jsx';
import { analytics } from '../lib/analytics.js';
import { buildMailtoUrl } from '../utils/buildMailto.js';
import { buildWhatsAppUrl } from '../utils/whatsapp.js';
import styles from './MobileCTA.module.css';

function MobileCTA({ contactInfo }) {
  const [isMobile, setIsMobile] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMobile = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMobile);
      return () => {
        mediaQuery.removeEventListener('change', updateMobile);
      };
    }

    mediaQuery.addListener(updateMobile);
    return () => {
      mediaQuery.removeListener(updateMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || typeof window === 'undefined') {
      setContactVisible(false);
      return undefined;
    }

    const contactSection = document.getElementById('contacto');

    if (!contactSection || typeof window.IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setContactVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -18% 0px',
      }
    );

    observer.observe(contactSection);

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        phone: contactInfo.phoneRaw.replace('+', ''),
        projectType: 'un proyecto web',
      }),
    [contactInfo.phoneRaw]
  );

  const mailtoUrl = useMemo(
    () =>
      buildMailtoUrl({
        to: contactInfo.email,
        subject: 'Consulta desde portafolio',
        body: 'Hola Marco,\n\nVi tu portafolio y me interesa platicar contigo.',
      }),
    [contactInfo.email]
  );

  if (!isMobile || contactVisible) {
    return null;
  }

  return (
    <div className={styles.root}>
      <a
        className={styles.primary}
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp para contactar a Marco"
        onClick={() =>
          analytics.track('click_whatsapp', {
            section: 'mobile_cta',
            label: 'whatsapp_sticky',
            url: whatsappUrl,
          })
        }
      >
        <Icon name="MessageCircle" size="sm" color="var(--bg-primary)" className="icon--interactive" />
        <span>WhatsApp</span>
      </a>

      <a
        className={styles.secondary}
        href={mailtoUrl}
        aria-label="Abrir email para contactar a Marco"
        onClick={() =>
          analytics.track('outbound_link', {
            section: 'mobile_cta',
            label: 'email_sticky',
            url: `mailto:${contactInfo.email}`,
          })
        }
      >
        <Icon name="Mail" size="sm" color="secondary" className="icon--interactive" />
        <span>Email</span>
      </a>
    </div>
  );
}

export default MobileCTA;
