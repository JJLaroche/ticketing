import axios from "axios";

export default ({ req }) => {
    if (typeof window === 'undefined') {
        
        return axios.create({
            //http://SERVICENAME.NAMESPACE.svc.cluster.local
            //baseURL: 'http://ingress-nginx-controller.kube-system.svc.cluster.local',
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers,
        });
    } else {
        return axios.create({
            baseURL: '/'
        });
    }
};