import React from 'react'

export default function Alert(props) {
    const titleCase = (str) => {
        if(str==="danger"){
            str = "error"
        }
        const lower = str.toUpperCase();
           return lower.charAt(0).toUpperCase() + lower.slice(1).toLowerCase();
        };
    return (
         // First props.alert is evaluate, if this is false further process will no evaluate
         // cls - cumalative layouts shift for optimised seo
        <div style={{height: '50px'}}>

           {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{titleCase(props.alert.type)}</strong>:{props.alert.msg}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>
    )
}