import { useEffect, useState } from 'react';
import { Container, Header, Spinner } from '@cloudscape-design/components';

export const WindfinderWidget = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.windfinder.com/widget/forecast/js/arlington_virginia_usa?unit_wave=m&unit_rain=mm&unit_temperature=f&unit_wind=mph&unit_pressure=hPa&days=2&show_day=1&show_waves=0';
    script.async = true;
    script.onload = () => setLoading(false);
    document.getElementById('windfinder-widget')?.appendChild(script);

    return () => {
      document.getElementById('windfinder-widget')?.removeChild(script);
    };
  }, []);

  return (
    <Container
      header={<Header variant='h2'>Wind forecast</Header>}
      media={{
        position: 'top',
        height: 'object-fit: center',
        content: (
          <div id='windfinder-widget' style={{ height: '400px', overflow: 'auto' }}>
            {loading && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%',
                }}
              >
                <Spinner size='large' />
              </div>
            )}
            <noscript>
              <a
                rel='nofollow'
                href='https://www.windfinder.com/forecast/arlington_virginia_usa?utm_source=forecast&utm_medium=web&utm_campaign=homepageweather&utm_content=noscript-forecast'
              >
                Wind forecast for Arlington
              </a>{' '}
              provided by{' '}
              <a
                rel='nofollow'
                href='https://www.windfinder.com?utm_source=forecast&utm_medium=web&utm_campaign=homepageweather&utm_content=noscript-logo'
              >
                windfinder.com
              </a>
            </noscript>
          </div>
        ),
      }}
    />
  );
};
