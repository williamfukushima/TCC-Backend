interface MVCInjectorType
{
    model:{
        properties: any;            
        modelUpdates: any;
        modelEvents: any;
    };
    view:{
        properties: any;
        inputFunctions: any;
        viewUpdate: any;
    }
}
