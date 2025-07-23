import GetConfig from '../../helpers/GetConfig';

export const sendToOmniture: (pageName: string) => void = (pageName) => {
  const { enableOmniture } = GetConfig();
  if (window.s && enableOmniture) {
    window.s.server = '';
    window.s.channel = 'Consumer';
    window.s.pageType = 'Wrapper';
    window.s.prop1 = 'StormIdeas';
    window.s.prop2 = '';
    window.s.prop3 = '';
    window.s.prop4 = '';
    window.s.prop5 = '';

    window.s.pageName = pageName;
    const s_code = window.s.t();
    if (s_code) {
      document.write(s_code);
    }
  }
};
