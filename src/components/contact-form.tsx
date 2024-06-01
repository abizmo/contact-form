import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ui/button'
import { Checkbox } from '@ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@ui/form'
import { Input } from '@ui/input'
import { RadioGroup, RadioGroupItem } from '@ui/radio-group'
import { toast } from '@ui/use-toast'
import { Textarea } from '@ui/textarea'

const contactFormSchema = z.object({
  first_name: z.string({ required_error: 'This field is required' }),
  last_name: z.string({ required_error: 'This field is required' }),
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  query_type: z.enum(['general', 'support'], {
    required_error: 'Please select a query type'
  }),
  message: z.string({ required_error: 'This field is required' }),
  consent: z.boolean({
    required_error: 'To submit this form, please consent to being contacted'
  })
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const defaultValues: Partial<ContactFormValues> = {
  first_name: '',
  last_name: '',
  email: '',
  message: '',
  consent: false
}

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: 'onChange'
  })

  function onSubmit(data: ContactFormValues) {
    toast({
      title: 'Message sent!',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=''>
        <FormField
          control={form.control}
          name='first_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='last_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='query_type'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Query Type</FormLabel>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className=''
              >
                <FormItem>
                  <FormLabel className=''>
                    <FormControl>
                      <RadioGroupItem value='general' className='sr-only' />
                    </FormControl>
                    <span className=''>General</span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className=''>
                    <FormControl>
                      <RadioGroupItem value='support' className='sr-only' />
                    </FormControl>
                    <span className=''>Support</span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder='' className='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='consent'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>I consent to being contacted by the team</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
