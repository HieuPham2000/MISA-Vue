<template>
<div class="input-wrapper">
  <DatePick
    v-model="value"
    :format="format"
    :displayFormat="displayFormat"
    :nextMonthCaption="nextMonthCaption"
    :prevMonthCaption="prevMonthCaption"
    :weekdays="weekdays"
    :months="months"
    :isDateDisabled="isFutureDate"
    :input-attributes="inputAttributes"
  ></DatePick>
  <!-- btn clear text -->
    <div class="btn-clear-text">
      <img src="@/assets/icon/x.svg" />
    </div>
</div>
</template>

<script>
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  components: {
    DatePick,
  },
  data() {
    return {
        date: "",
        inputAttributes: {
          placeholder: this.displayFormat,
          title: `Nhập giá trị theo định dạng ${this.displayFormat}`,
          tabindex: "0" 
        }
    };
  },
  methods: {
    isFutureDate(date) {
        const currentDate = new Date();
        return date > currentDate;
    }
  },
  props: {
    value: {
        type: String
    },
    format: {
      type: String,
      default: "YYYY-MM-DD",
    },
    displayFormat: {
      type: String,
      default: "DD-MM-YYYY",
    },
    nextMonthCaption: { type: String, default: "Tháng sau" },
    prevMonthCaption: { type: String, default: "Tháng trước" },
    weekdays: {
      type: Array,
      default: () => ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    },
    months: {
      type: Array,
      default: () => [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
      ],
    },
  },
};
</script>

<style>
.vdpComponent {
    width: 100%;
}
.vdpArrowPrev:after {
  border-right-color: #01b075;
}

.vdpArrowNext:after {
  border-left-color: #01b075;
}

.vdpCell.selectable:hover .vdpCellContent,
.vdpCell.selected .vdpCellContent {
  background: #01b075;
}

.vdpCell.today {
  color: #01b075;
}
</style>