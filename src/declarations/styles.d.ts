declare module "*.module.scss" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.scss" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}
