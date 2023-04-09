import { YearRangeItemType } from '@/component/datepicker/src/component/yearpicker/type';
import { MonthRangeItemType } from '@/component/datepicker/src/component/monthpicker/type';
import { DateRangeItemType } from '@/component/datepicker/src/component/datePicker/type';

export function getIsDisabled(range: (YearRangeItemType | MonthRangeItemType | DateRangeItemType)[], year: number, month = 0, date = 1) {
  // 没有range，则均可操作
  if (!range || range.length === 0) {
    return false;
  }

  // 判断当range中的end存在而start不存在的情况
  return !range.some((x) => {
    const startYear = 'start' in x && 'year' in x.start ? x.start.year : 1970;
    const startMonth = 'start' in x && 'month' in x.start ? x.start.month - 1 : 0;
    const startDate = 'start' in x && 'date' in x.start ? x.start.date : 1;
    const startTime = new Date(startYear, startMonth, startDate);

    const endYear = 'end' in x ? x.end.year : 1970;
    const endMonth = 'end' in x && 'month' in x.end ? x.end.month - 1 : 11;
    const endDate =
      'end' in x && 'date' in x.end ? x.end.date : new Date(endYear, endMonth + 1, 0).getDate();
    const endTime = new Date(endYear, endMonth, endDate);

    const curTime = new Date(year, month, date);

    if (!('start' in x) && ('end' in x)) {
      return curTime <= endTime;
    } else if (('start' in x) && !('end' in x)) {
      return curTime >= startTime;
    } else if (('start' in x) && ('end' in x)) {
      return curTime >= startTime && curTime <= endTime;
    }

    return false;
  });
}
