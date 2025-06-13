// src/custom-elements.d.ts
declare global {
    namespace JSX {
      interface IntrinsicElements {
        'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { icon: string };
      }
    }
  }
  
  export {};
  