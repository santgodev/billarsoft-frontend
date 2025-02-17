import { IComponent } from "./icomponent";

export interface IModule {
    id: number
    name: string,
    description: string
    components: IComponent[];
}
