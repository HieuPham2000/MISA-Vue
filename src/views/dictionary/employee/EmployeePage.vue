<template>
  <div>
    <BaseToastMessage />
    <BasePopUp />
    <EmployeeList />
    <EmployeeDetail />
  </div>
</template>

<style scoped>
</style>

<script>
import EmployeeList from './EmployeeList.vue';
import EmployeeDetail from './EmployeeDetail.vue';
import BaseToastMessage from '../../../components/base/BaseToastMessage.vue';
import BasePopUp from '../../../components/base/BasePopUp.vue';

import {toggleMenu} from '../../../script/base/main';
import {initValidate} from '../../../script/base/validate';

import {Combobox} from '../../../script/common/combobox';
import {SelectBox} from '../../../script/common/selectbox';
import {addButtonClearInput} from '../../../script/common/input';
import {initFormatForm} from '../../../script/common/form';

import {EmployeePage} from '../../../script/page/employee';

export default {
  name: "EmployeePage",
  components: {
    EmployeeList, EmployeeDetail, BaseToastMessage, BasePopUp
  },
  mounted() {
    toggleMenu();
    initValidate();
    initFormatForm();
    

    // Combobox
    new Combobox(".m-combobox[data-name=Department]", "cukcuk.manhnv.net", "api/Department", "Department");
    new Combobox(".m-combobox[data-name=Position]", "cukcuk.manhnv.net/v1", "Positions", "Position");
    Combobox.loadGenderData();
    Combobox.loadWorkStatusData();

    Combobox.makeCombobox();

    // Selectbox
    SelectBox.makeSelectbox();

    // input
    addButtonClearInput();

    // EmployeePage
    new EmployeePage();
  }
}
</script>
