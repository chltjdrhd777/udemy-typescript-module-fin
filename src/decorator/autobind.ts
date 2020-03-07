//autobind decorator
export function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // in method decorator, value contain original method.
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this); // Then, autoBind would attach bind(this) which allows the target method to act in the boundary of the same area it is involved.
      return boundFn;
    }
  };
  return adjDescriptor;
}
