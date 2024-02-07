import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { ZxControlErrorMessage } from './control-error-message.component';

const meta: Meta<ZxControlErrorMessage> = {
    component: ZxControlErrorMessage,
    title: 'ZxControlErrorMessage'
};
export default meta;
type Story = StoryObj<ZxControlErrorMessage>;

export const Primary: Story = {
    args: {
        message: 'Error message'
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText(/Error message/gi)).toBeTruthy();
    }
};
