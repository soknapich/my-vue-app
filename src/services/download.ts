import axios from 'axios';
import { getToken } from '@/services/authentication';
import { useLoadingStore } from '@/stores/loading';
const apiUrl = import.meta.env.VITE_APP_BASE_API;

const exportExcell = async (path: any, fileName: 'file') => {
    const token = (await getToken()) || '';

    //Pinia
    const loading = useLoadingStore();
    loading.start();

    const response = await axios.post(`${apiUrl}/${path}`, {
        order_field: 'id',
        order_by: 'desc'
    },
        {
            responseType: 'blob', // 🔥 REQUIRED
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
    );

    loading.end();

    // Create file download
    const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName + '.xlsx')

    document.body.appendChild(link)
    link.click()
    // Cleanup
    link.remove()
    window.URL.revokeObjectURL(url)

};

export default exportExcell;