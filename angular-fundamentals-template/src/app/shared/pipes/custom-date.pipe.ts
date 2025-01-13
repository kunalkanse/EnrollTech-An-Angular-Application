import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(value: any) {
        const [day, month, year] = value.split('/').map(Number);

        if (!day || !month || !year) {
            console.error('Invalid date format:', value);
            return 'Invalid Date';
        }

        const date = new Date(year, month - 1, day);

        if (isNaN(date.getTime())) {
            console.error('Invalid Date Object:', date);
            return 'Invalid Date';
        }

        const formattedDay = date.getDate().toString().padStart(2, '0');
        const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
        const formattedYear = date.getFullYear();

        return `${formattedDay}.${formattedMonth}.${formattedYear}`;
    }
}
