<?php

/* @Framework/Form/datetime_widget.html.php */
class __TwigTemplate_cdd7c0545bd5240b1908156193836885e57a7d658c4947822e28eafedc78a34e extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_8c09b752efb9f79771b7b3c454c5136320850aec30e6793f559bde57e0d5d0a1 = $this->env->getExtension("native_profiler");
        $__internal_8c09b752efb9f79771b7b3c454c5136320850aec30e6793f559bde57e0d5d0a1->enter($__internal_8c09b752efb9f79771b7b3c454c5136320850aec30e6793f559bde57e0d5d0a1_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/datetime_widget.html.php"));

        // line 1
        echo "<?php if (\$widget == 'single_text'): ?>
    <?php echo \$view['form']->block(\$form, 'form_widget_simple'); ?>
<?php else: ?>
    <div <?php echo \$view['form']->block(\$form, 'widget_container_attributes') ?>>
        <?php echo \$view['form']->widget(\$form['date']).' '.\$view['form']->widget(\$form['time']) ?>
    </div>
<?php endif ?>
";
        
        $__internal_8c09b752efb9f79771b7b3c454c5136320850aec30e6793f559bde57e0d5d0a1->leave($__internal_8c09b752efb9f79771b7b3c454c5136320850aec30e6793f559bde57e0d5d0a1_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/datetime_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if ($widget == 'single_text'): ?>*/
/*     <?php echo $view['form']->block($form, 'form_widget_simple'); ?>*/
/* <?php else: ?>*/
/*     <div <?php echo $view['form']->block($form, 'widget_container_attributes') ?>>*/
/*         <?php echo $view['form']->widget($form['date']).' '.$view['form']->widget($form['time']) ?>*/
/*     </div>*/
/* <?php endif ?>*/
/* */
