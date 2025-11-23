import TemplatePointers from './components/TemplatePointers';
import { BRAND } from '../../utils/branding/branding';

function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <h1 className="text-3xl text-center font-bold">
            <img
              src={BRAND.logo}
              className="w-12 inline-block mr-2 mask mask-circle"
              alt={`${BRAND.name} Logo`}
            />
            {BRAND.name}
          </h1>

          <div className="text-center mt-12">
            <img
              src="./intro.png"
              alt={`${BRAND.name} Admin Template`}
              className="w-48 inline-block"
            />
          </div>

          <TemplatePointers />
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
