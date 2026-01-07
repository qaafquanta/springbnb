import { Resend } from 'resend';

const resend = new Resend('re_SADfygM3_6mJ9GJmavwD6rL9s7N6YHkSR');

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@jalanframe.my.id>',
    to: ['kimhakka7@gmail.com'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();