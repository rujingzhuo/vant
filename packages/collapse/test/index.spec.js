import Collapse from '..';
import CollapseItem from '../../collapse-item';
import { later, mount } from '../../../test/utils';

const component = {
  template: `
  <collapse v-model="active" :accordion="accordion">
    <collapse-item title="a" name="first">content</collapse-item>
    <collapse-item title="b">content</collapse-item>
    <collapse-item title="c">content</collapse-item>
  </collapse>
  `,
  components: {
    Collapse,
    CollapseItem
  },
  props: {
    accordion: Boolean
  },
  data() {
    return {
      active: this.accordion ? '' : []
    };
  }
};

test('basic mode', async () => {
  const wrapper = mount(component);

  const titles = wrapper.findAll('.van-collapse-item__title');
  titles.at(0).trigger('click');
  expect(wrapper.vm.active).toEqual(['first']);

  await later();
  titles.at(1).trigger('click');
  expect(wrapper.vm.active).toEqual(['first', 1]);

  await later();
  titles.at(0).trigger('click');
  expect(wrapper.vm.active).toEqual([1]);

  wrapper.destroy();
});

it('accordion', async () => {
  const wrapper = mount(component, {
    propsData: {
      accordion: true
    }
  });

  const titles = wrapper.findAll('.van-collapse-item__title');
  titles.at(0).trigger('click');
  expect(wrapper.vm.active).toEqual('first');

  titles.at(1).trigger('click');
  expect(wrapper.vm.active).toEqual(1);

  await later();
  titles.at(0).trigger('click');
  expect(wrapper.vm.active).toEqual('first');

  titles.at(0).trigger('click');
  expect(wrapper.vm.active).toEqual('');
});

it('render collapse-item slot', () => {
  const wrapper = mount({
    template: `
      <collapse v-model="active">
        <collapse-item>
          <template v-slot:title>this is title</template>
          <template v-slot:value>this is value</template>
          <template v-slot:icon>this is icon</template>
          <template v-slot:right-icon>this is right icon</template>
        </collapse-item>
      </collapse>
      `,
    components: {
      Collapse,
      CollapseItem
    },
    data() {
      return {
        active: []
      };
    }
  });

  expect(wrapper).toMatchSnapshot();
});
